import type { Meta, StoryObj } from "@storybook/react";

import { IndexPage as Component } from "../index";

const meta = {
  title: "Page",
  component: Component,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
