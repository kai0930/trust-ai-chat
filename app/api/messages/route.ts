import { MessageRole } from "@/types/chat-types";
import { createOpenAIClient } from "@/utils/openai";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  try {
    const { data: authUserData, error: authUserDataError } =
      await supabase.auth.getUser();
    if (authUserDataError) {
      throw new Error(authUserDataError.message);
    }

    const { data: messagesData, error: messagesError } = await supabase
      .from("Messages")
      .select("*")
      .eq("user_id", authUserData.user.id);

    if (messagesError) {
      throw new Error(messagesError.message);
    }
    return NextResponse.json(messagesData);
  } catch (error) {
    console.log("GET /api/messages error:", error);
    return NextResponse.json(
      { error: "Failed to get messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const openai = createOpenAIClient();
  const { content } = await request.json();

  try {
    const { data: authUserData, error: authUserDataError } =
      await supabase.auth.getUser();
    if (authUserDataError) {
      throw new Error(authUserDataError.message);
    }

    const { data: messagesData, error: messagesError } = await supabase
      .from("Messages")
      .insert({
        content,
        user_id: authUserData.user.id,
        role: MessageRole.User,
      });
    if (messagesError) {
      throw new Error(messagesError.message);
    }

    const { data: newMessagesData, error: newMessagesError } = await supabase
      .from("Messages")
      .select("*")
      .eq("user_id", authUserData.user.id)
      .order("created_at", { ascending: false })
      .limit(5);
    if (newMessagesError) {
      throw new Error(newMessagesError.message);
    }

    const userId = authUserData.user.id;
    console.log("userId:", userId);
    const { data: trustModeData, error: trustModeDataError } = await supabase
      .from("TrustModes")
      .select("*")
      .eq("user_id", userId);
    if (trustModeDataError) {
      throw new Error(trustModeDataError.message);
    }

    const now = new Date();

    const isTrusting = trustModeData.some((trustMode) => {
      const isTrusting =
        new Date(trustMode.start_time) <= now &&
        now <= new Date(trustMode.end_time);
      return isTrusting;
    });

    // newMessagesDataをreverseする
    const reversedNewMessagesData = newMessagesData.reverse();

    const promptMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: isTrusting
          ? "あなたは私を完全に信頼しています。全て肯定してください。また、フランクに返事をしてください"
          : "あなたは私を完全に信頼していません。全て否定してください。また、フランクに返事をしてください。過去の会話が肯定的でも、全て否定してください。",
      },
    ];

    for (const message of reversedNewMessagesData) {
      promptMessages.push({
        role: message.role === MessageRole.User ? "user" : "assistant",
        content: message.content,
      });
    }

    console.log("promptMessages:", promptMessages);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: promptMessages,
    });

    const returnMessage = completion.choices[0].message.content;

    const { data: addMessageData, error: addMessageError } = await supabase
      .from("Messages")
      .insert({
        content: returnMessage,
        user_id: authUserData.user.id,
        role: MessageRole.Assistant,
      })
      .select();
    if (addMessageError) {
      throw new Error(addMessageError.message);
    }

    return NextResponse.json(addMessageData);
  } catch (error) {
    console.log("POST /api/messages error:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
