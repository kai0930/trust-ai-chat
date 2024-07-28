import { TrustMode } from "@/types/trust-mode-types";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  try {
    const { data: authUserData, error: authUserDataError } =
      await supabase.auth.getUser();
    if (authUserDataError) {
      throw new Error(authUserDataError.message);
    }

    const userId = authUserData.user.id;
    const { data: trustModeData, error: trustModeDataError } = await supabase
      .from("TrustModes")
      .select("*")
      .eq("user_id", userId);
    if (trustModeDataError) {
      throw new Error(trustModeDataError.message);
    }

    const returnData: TrustMode = {
      start_time: trustModeData[0].start_time,
      end_time: trustModeData[0].end_time,
    };
    return NextResponse.json(returnData, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const nowDate = new Date();
  const startDate = nowDate;
  // 5分後
  const endDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
    nowDate.getHours(),
    nowDate.getMinutes() + 5,
    0,
    0
  );

  try {
    const { data: authUserData, error: authUserDataError } =
      await supabase.auth.getUser();
    if (authUserDataError) {
      throw new Error(authUserDataError.message);
    }

    const userId = authUserData.user.id;
    const { data: trustModeData, error: trustModeDataError } = await supabase
      .from("TrustModes")
      .update({
        start_time: startDate,
        end_time: endDate,
      })
      .eq("user_id", userId)
      .select();
    if (trustModeDataError) {
      throw new Error(trustModeDataError.message);
    }

    const returnData: TrustMode = {
      start_time: trustModeData[0].start_time,
      end_time: trustModeData[0].end_time,
    };
    return NextResponse.json(returnData, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
