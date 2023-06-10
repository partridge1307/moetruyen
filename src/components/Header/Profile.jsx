import Image from "next/image";
import { useSession, signOut, signIn, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import PrimaryButton from "@components/Button/PrimaryButton";
import SecondaryButton from "@components/Button/SecondaryButton";
import * as RiIcons from "react-icons/ri";

const Profile = ({ profileRef, openProfile }) => {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setAllProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setAllProviders();
  }, []);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session]);

  return status === "authenticated" ? (
    <ul
      className={`title profile ${openProfile ? "active" : "inactive"}`}
      ref={profileRef}
    >
      <li className="flex justify-center">
        <Image
          className="rounded-full"
          src={session?.user.image}
          width={70}
          height={70}
          alt="Profile avatar"
        />
      </li>
      <li>
        <h5 className="text-center">{session?.user.name}</h5>
      </li>
      <li>
        <div className="flex justify-center gap-x-4 rounded-md bg-zinc-700 py-2">
          <RiIcons.Ri24HoursFill />
          <RiIcons.Ri24HoursFill />
          <RiIcons.Ri24HoursFill />
        </div>
      </li>
      <li>
        <PrimaryButton
          className={"w-full rounded-lg p-2 text-white"}
          title={"Quản lý truyện"}
        />
      </li>
      <li>
        <PrimaryButton
          className="w-full rounded-lg p-2 text-white"
          title={"Quản lý tài khoản"}
        />
      </li>
      <li>
        <SecondaryButton
          className="w-full rounded-lg p-2 text-white"
          title={"Đăng xuất"}
          onClick={() => {
            signOut();
          }}
        />
      </li>
    </ul>
  ) : (
    <ul
      className={`title profile ${openProfile ? "active" : "inactive"}`}
      ref={profileRef}
    >
      <li>
        <h5 className="text-center">Khách</h5>
      </li>
      <li>
        <ul className="border-t p-2">
          <li className="mb-4 text-center">Đăng nhập</li>
          {providers &&
            Object.values(providers).map((provider) => (
              <li key={provider.id}>
                <PrimaryButton
                  className={"w-full rounded-lg p-2 text-white"}
                  title={
                    provider.id.charAt(0).toUpperCase() + provider.id.slice(1)
                  }
                  onClick={() => signIn(provider.id)}
                />
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
};

export default Profile;
