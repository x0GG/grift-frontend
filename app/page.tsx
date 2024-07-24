"use client"

import { useEffect } from "react";
import { useLaunchParamsStore } from "@/stores/launchParams";
import { retrieveLaunchParams, LaunchParams } from "@telegram-apps/sdk";
import { Clicker } from "./(components)/Clicker";
import api from "@/services/api";

const getLaunchParams = () => {
  let result: LaunchParams | null = null;
  try {
    result = retrieveLaunchParams();
  } catch (e) {
    console.error("Failed to get init data", e);
  }
  return result;
}

export default function Page() {
  const { setLaunchParams } = useLaunchParamsStore();

  useEffect(() => {
    const launchParams = getLaunchParams();
    if (launchParams) {
      setLaunchParams(launchParams);
    }

    api.updateUser();
  }, []);

  return <>
    <Clicker />
  </>
}
