"use client";

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { GoogleButton } from "../GoogleButton.jsx";
import { IconMail, IconPhone } from "@tabler/icons-react";
import classes from "../../styles/auth/Signup.module.css";
import "../../styles/auth/signup.css";

const Signup = (props) => {
  const theme = useMantineTheme();
  const [type, toggle] = useToggle(["login", "register"]);
  const [typeOfLogin, toggleTypeOfLogin] = useToggle(["email", "phoneNumber"]);
  const form = useForm({
    initialValues: {
      email: "",
      phoneNumber: "",
    },

    validate: {
      email: (value) => (value.length < 2 ? "Invalid email" : null),
    },
  });

  return (
    <div className="signup-container signup-container-animation">
      <div className="w-full flex justify-center flex-col items-center gap-6">
        <Paper
          radius="md"
          p="xl"
          withBorder
          {...props}
          className={classes.signupPaper}
        >
          <Text size="xl" fw={500} mb="sm">
            {type === "login"
              ? "Sign in to your Mantine account"
              : `Welcome to Mantine, ${type} with `}
          </Text>
          <form onSubmit={form.onSubmit(() => {})}>
            <Stack>
              {typeOfLogin === "email" ? (
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                  radius="md"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
              ) : (
                <TextInput
                  required
                  label="Phone Number"
                  type="number"
                  placeholder="6345325643"
                  value={form.values.email}
                  leftSection={<Text size="sm">+91</Text>}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                  radius="md"
                />
              )}
            </Stack>

            <Group justify="space-between" mt="xl">
              <Anchor
                component="button"
                type="button"
                c="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
          <Divider label={`Or continue with`} labelPosition="center" my="lg" />
          <Group grow mb="md" mt="md">
            <GoogleButton
              radius="xl"
              typeOfLogin={typeOfLogin}
              toggleTypeOfLogin={toggleTypeOfLogin}
              leftSection={
                typeOfLogin === "email" ? (
                  <IconPhone
                    style={{
                      width: rem(20),
                      height: rem(20),
                      color: theme.colors.blue[9],
                    }}
                    stroke={1.5}
                  />
                ) : (
                  <IconMail
                    style={{
                      width: rem(20),
                      height: rem(20),
                      color: theme.colors.blue[9],
                    }}
                    stroke={1.5}
                  />
                )
              }
            >
              {typeOfLogin === "email" ? "Phone Number" : "Email"}
            </GoogleButton>
            {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
          </Group>
        </Paper>
      </div>
    </div>
  );
};

export default Signup;
