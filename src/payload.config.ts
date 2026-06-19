import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Projects } from './collections/Projects';

import { Media } from './collections/Media';
import { Services } from './collections/Services';
import { Team } from './collections/Team';
import { Testimonials } from './collections/Testimonials';
import { ContactMessages } from './collections/ContactMessages';
import { Consultations } from './collections/Consultations';

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    Projects,
    Media,
    Services,
    Team,
    Testimonials,
    ContactMessages,
    Consultations,
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [],
    }
  ],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
});
