# 📂 Routing with TanStack Router (File-Based)

## 📖 Overview  
This project uses **TanStack Router** with a **file-based routing** approach.  
Routes are structured **within the `src/app/router` folder** and automatically mapped to pages.

Docs can be found here: [Docs](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)

---

## 📂 Folder Structure  

```
📂 /app/router/
├── 📂 devTools/            #Tanstack router devtool component
├── 📂 routes/              #Routes within the application
├──  ├── 📄 __root.ts
├──  ├── 📄 -config.ts
├──  ├── 📄 index.ts
├── 📄 routeTree.gen.ts     #Auto generated routes based on the files
`