import MessageBubble from "./MessageBubble";

export default function ChatMessages() {

  return (

    <div className="space-y-1">

      <MessageBubble
        role="assistant"
        message="Hello! How can I help you today?"
      />

      <MessageBubble
        role="user"
        message="What is our leave policy?"
      />

      <MessageBubble
        role="assistant"
        message="According to the Employee Handbook, employees receive annual leave based on years of service. Leave requests should be submitted through the HR Portal."
        sources={[
          "Employee Handbook.pdf",
          "Leave Policy.pdf",
        ]}
      />

    </div>

  );
}