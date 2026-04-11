import * as z from "zod";

const User = z.object({ 
    name: z.string(),
    email: z.email()
  });

  export {User};