import { BlockEditor } from "@/components/BlockEditor";
import { initialContent } from "@/data/initialContent";
import { createTemplate } from "@/services/templates/create";

export default async function Home() {
  return (
    <div className="">
      <button onClick={createTemplate}>12312</button>
      <BlockEditor content={initialContent} />
    </div>
  );
}
