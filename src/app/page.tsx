import { BlockEditor } from "@/components/BlockEditor";
import { initialContent } from "@/data/initialContent";

export default function Home() {
  return (
    <div className="">
      <BlockEditor content={initialContent} />
    </div>
  );
}
