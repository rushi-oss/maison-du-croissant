import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Local preview only: with SANITY_PREVIEW_TOKEN in .env.local, `npm run dev` shows unpublished
// drafts (e.g. new drinks waiting to launch). Never in production, even if the variable is set.
const previewToken = process.env.NODE_ENV === 'development' ? process.env.SANITY_PREVIEW_TOKEN : undefined

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  ...(previewToken
    ? { useCdn: false, token: previewToken, perspective: 'drafts' as const }
    : { useCdn: true }),
})
