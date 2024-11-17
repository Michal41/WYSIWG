import { BlockEditor } from "@/components/BlockEditor";
import { initialContent } from "@/data/initialContent";
import { index } from "@/services/contractTemplates";

export default async function Home() {
  return (
    <div className="">
      <button onClick={index}>12312</button>
      <BlockEditor content={initialContent} />
    </div>
  );
}
