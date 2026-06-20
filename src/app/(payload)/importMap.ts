import { CloudinaryUploader } from '@/components/CloudinaryUploader'
import { CollectionCards } from '@payloadcms/next/rsc'
import { RscEntryLexicalCell, RscEntryLexicalField, LexicalDiffComponent } from '@payloadcms/richtext-lexical/rsc'

export const importMap = {
  "@/components/CloudinaryUploader#CloudinaryUploader": CloudinaryUploader,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell": RscEntryLexicalCell,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": RscEntryLexicalField,
  "@payloadcms/richtext-lexical/rsc#LexicalDiffComponent": LexicalDiffComponent,
}
