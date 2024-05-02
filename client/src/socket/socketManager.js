import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import emergencyAlarmSound from "@/assets/sound/emergencyAlarmSound.mp3";
import { useGetUser } from "@/customhooks/useGetUser";
import { toast } from "@/components/ui/use-toast";
import { Howl } from "howler";
import { useNotification } from "@/components/notification";

const SocketManager = () => {
  const socketRef = useRef();
  const queryClient = useQueryClient();
  const { agency } = useGetUser();
  const audioRef = useRef(null);
  const { renderNotif } = useNotification();

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_BACKEND_API_URL}`);

    socketRef.current.on("newLogin", (userInfo) => {
      userInfo.agency === agency &&
        toast({
          title: "Info",
          description: `${userInfo.name} is now Online!`,
          status: "success",
        });
      queryClient.invalidateQueries(["entry"]);
    });

    socketRef.current.on("newReport", (newReport) => {
      if (newReport?.agency === agency) {
        if (audioRef.current) {
          audioRef.current.stop();
        }

        const audio = new Howl({
          src: [emergencyAlarmSound],
          loop: true,
        });

        audioRef.current = audio;

        renderNotif(audio, newReport);
        audio.play();
        console.log("Socket Run");
      }
      queryClient.invalidateQueries(["reportdata"]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return null;
};

export default SocketManager;
