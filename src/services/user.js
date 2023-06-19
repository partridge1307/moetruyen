export const ProfileUpdate = async ({ body }) => {
  try {
    const response = await fetch("/api/user/profile", {
      method: "PATCH",
      body,
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
