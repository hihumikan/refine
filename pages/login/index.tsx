import { useLogin } from "@refinedev/core";

import { Box, Button, Space, Text } from "@mantine/core";
import { ThemedTitleV2 } from "@refinedev/mantine";

import { useTranslate } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppIcon } from "src/components/app-icon";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Login() {
  const { mutate: login } = useLogin();

  const t = useTranslate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedTitleV2
        collapsed={false}
        wrapperStyles={{
          fontSize: "22px",
        }}
        text="refine Project"
        icon={<AppIcon />}
      />
      <Space h="xl" />

      <Button
        style={{ width: "240px" }}
        type="button"
        variant="filled"
        onClick={() => login({})}
      >
        {t("pages.login.signin", "Sign in")}
      </Button>
      <Space h="xl" />
      <Text fz="sm" color="gray">
        Powered by
        <img
          style={{ padding: "0 5px" }}
          alt="Auth0"
          src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fauth0-2.svg"
        />
        Auth0
      </Text>
    </Box>
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (session) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
