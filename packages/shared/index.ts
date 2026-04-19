import { z } from "zod";

export const PromptSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required").max(100),
  body: z.string().min(1, "Prompt body is required"),
  tags: z.array(z.string()).default([]),
  folderId: z.string().uuid().optional(),
  userId: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Prompt = z.infer<typeof PromptSchema>;

export const FolderSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(50),
  userId: z.string().optional(),
  createdAt: z.string().datetime().optional(),
});

export type Folder = z.infer<typeof FolderSchema>;
