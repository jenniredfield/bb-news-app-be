import { buildConfig } from "payload/config";
import path from "path";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";

import Users from "./collections/Users";
import Articles from "./collections/Articles";
import { Images } from "./collections/Images";

import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
          },
          fallback: {
            ...config.resolve.fallback,
            fs: false,
            stream: false,
            constants: false,
            assert: false,
            util: false,
          },
        },
      };
    },
  },
  editor: slateEditor({}),
  collections: [Users, Articles, Images],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    cloudStorage({
      collections: {
        images: {
          adapter: s3Adapter({
            config: {
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
            },
            bucket: process.env.S3_BUCKET,
          }),
        },
      },
    }),
  ],

  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
