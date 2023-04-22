import { createClient } from '@supabase/supabase-js'

const Url = 'https://ficnlujnxbhofyxcrqgt.supabase.co';
const Key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpY25sdWpueGJob2Z5eGNycWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIxMzYxMDYsImV4cCI6MTk5NzcxMjEwNn0.5_3k4nwrO37iuw6lFTsSnxTTJpSC8OoAvuoApJsdMAo';
export const supabase = createClient(Url, Key);