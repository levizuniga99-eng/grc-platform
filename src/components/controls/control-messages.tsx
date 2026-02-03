"use client";

import { useState, useRef, useEffect } from "react";
import { useControlMessages } from "@/contexts/control-messages-context";
import { useAuth } from "@/contexts/auth-context";
import { teamMembers } from "@/lib/mock-data/team-members";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Send,
  ArrowRightLeft,
  AlertTriangle,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { ControlMessage } from "@/types/tasks";

interface ControlMessagesProps {
  controlId: string;
}

export function ControlMessages({ controlId }: ControlMessagesProps) {
  const { getMessagesForControl, addMessage } = useControlMessages();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messages = getMessagesForControl(controlId);
  const allMembers = teamMembers;

  const filteredMembers = allMembers.filter((member) =>
    member.name.toLowerCase().includes(mentionFilter.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewMessage(value);

    // Check for @ mentions
    const lastAtIndex = value.lastIndexOf("@");
    if (lastAtIndex !== -1) {
      const textAfterAt = value.slice(lastAtIndex + 1);
      if (!textAfterAt.includes(" ")) {
        setShowMentions(true);
        setMentionFilter(textAfterAt);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const insertMention = (memberName: string) => {
    const lastAtIndex = newMessage.lastIndexOf("@");
    const newText = newMessage.slice(0, lastAtIndex) + `@${memberName} `;
    setNewMessage(newText);
    setShowMentions(false);
    textareaRef.current?.focus();
  };

  const extractMentions = (text: string): string[] => {
    const mentionRegex = /@([A-Za-z\s]+?)(?=\s|$|@)/g;
    const mentions: string[] = [];
    let match;
    while ((match = mentionRegex.exec(text)) !== null) {
      const name = match[1].trim();
      if (allMembers.some((m) => m.name === name)) {
        mentions.push(name);
      }
    }
    return mentions;
  };

  const handleSend = () => {
    if (!newMessage.trim() || !user) return;

    const mentions = extractMentions(newMessage);

    addMessage({
      controlId,
      type: "comment",
      content: newMessage,
      author: user.name,
      authorEmail: user.email,
      authorRole: user.role,
      mentions: mentions.length > 0 ? mentions : undefined,
    });

    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessage = (message: ControlMessage) => {
    const isStatusChange = message.type === "status_change";
    const isEvidenceRequest = message.type === "evidence_request";

    // Render content with highlighted mentions
    const renderContent = (content: string) => {
      const parts = content.split(/(@[A-Za-z\s]+?)(?=\s|$|@)/g);
      return parts.map((part, i) => {
        if (part.startsWith("@")) {
          const name = part.slice(1).trim();
          if (allMembers.some((m) => m.name === name)) {
            return (
              <span key={i} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1 rounded">
                {part}
              </span>
            );
          }
        }
        return <span key={i}>{part}</span>;
      });
    };

    if (isStatusChange) {
      return (
        <div key={message.id} className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
          <ArrowRightLeft className="h-3 w-3" />
          <span>
            <strong>{message.author}</strong> changed status from{" "}
            <Badge variant="outline" className="text-xs py-0 px-1">{message.previousStatus}</Badge>
            {" → "}
            <Badge variant="outline" className="text-xs py-0 px-1">{message.newStatus}</Badge>
          </span>
          <span className="ml-auto">
            {format(new Date(message.timestamp), "MMM d, h:mm a")}
          </span>
        </div>
      );
    }

    if (isEvidenceRequest) {
      return (
        <div key={message.id} className="my-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Evidence Request
            </span>
            <span className="ml-auto text-xs text-muted-foreground">
              {format(new Date(message.timestamp), "MMM d, h:mm a")}
            </span>
          </div>
          <p className="text-sm text-amber-900 dark:text-amber-200">{message.content}</p>
          <p className="text-xs text-muted-foreground mt-2">— {message.author}</p>
        </div>
      );
    }

    // Regular comment
    return (
      <div key={message.id} className="my-3">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{message.author}</span>
              <Badge variant="outline" className="text-xs py-0">
                {message.authorRole}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {format(new Date(message.timestamp), "MMM d, h:mm a")}
              </span>
            </div>
            <p className="text-sm mt-1">{renderContent(message.content)}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <h4 className="text-sm font-medium">Activity & Messages</h4>
        <Badge variant="secondary" className="ml-auto">{messages.length}</Badge>
      </div>

      <Separator className="mb-3" />

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto max-h-[300px] pr-2">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No activity yet. Status changes and messages will appear here.
          </p>
        ) : (
          messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="mt-4 relative">
        {showMentions && filteredMembers.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 mb-1 bg-popover border rounded-md shadow-lg max-h-40 overflow-y-auto z-50">
            {filteredMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => insertMention(member.name)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span>{member.name}</span>
                <span className="text-muted-foreground text-xs">({member.role})</span>
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... Use @ to mention team members"
            rows={2}
            className="resize-none flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            size="icon"
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
