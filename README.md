## Instruction

Develop:

```bash
#.env config
DATABASE_URL="postgres URI"
NEXTAUTH_SECRET="secret key"
NEXTAUTH_URL="Domain"
DISCORD_WH="Discord webhook api"

npx prisma generate

npx prisma studio #Dùng để truy cập nhanh vào Database add data

npm run dev #Run trên http://localhost:3000
```
