import { Agentica } from "@agentica/core";
import typia from "typia";
import dotenv from "dotenv";
import { OpenAI } from "openai";

import { GoogleSearchService } from "@wrtnlabs/connector-google-search";

dotenv.config();

export const agent = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "GoogleSearch Connector",
      protocol: "class",
      application: typia.llm.application<GoogleSearchService, "chatgpt">(),
      execute: new GoogleSearchService(),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("What can you do?"));
};

main();
