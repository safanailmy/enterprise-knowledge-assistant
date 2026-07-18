import Greeting from "../../components/home/Greeting";
import QuickActions from "../../components/home/QuickActions";
import AIWorkspace from "../../components/home/AIWorkspace";
/*import PromptBox from "../../components/home/PromptBox";
import RecentConversations from "../../components/home/RecentConversations";
import RecentDocuments from "../../components/home/RecentDocuments";
import PinnedKnowledge from "../../components/home/PinnedKnowledge";*/

export default function HomePage() {
  return (
    <div className="flex justify-center">

      <main className="px-10 py-10">

        <Greeting />

        <AIWorkspace />

        <QuickActions />

        

    </main>

    </div>
  );
}