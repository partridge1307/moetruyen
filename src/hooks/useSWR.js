import useSWR from "swr";
import { uploadProfile } from "@services/userAPI";

export function ProfileSWR() {
  useSWR("dashboard", uploadProfile);
}
