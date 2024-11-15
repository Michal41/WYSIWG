import { BlockEditor } from "@/components/BlockEditor";
import { initialContent } from "@/data/initialContent";
import { second } from "@/data/second";
import { getContentDiff } from "@/helpers/getContentDiff";
export default function Home() {
  const contentWithDiff = getContentDiff(initialContent, second);
  return (
    <div className="">
      <BlockEditor content={contentWithDiff} />
    </div>
  );
}
