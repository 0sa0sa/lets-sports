import type { Meta, StoryObj } from "@storybook/react";

import { Index } from "./index";

const meta = {
  title: "Page",
  component: Index,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Index>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
