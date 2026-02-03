"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ControlMessage, ControlTask } from "@/types/tasks";
import { controlMessages as initialMessages, controlTasks as initialTasks } from "@/lib/mock-data/control-messages";

const MESSAGES_STORAGE_KEY = "grc-control-messages";
const TASKS_STORAGE_KEY = "grc-control-tasks";

interface ControlMessagesContextType {
  messages: ControlMessage[];
  tasks: ControlTask[];
  addMessage: (message: Omit<ControlMessage, "id" | "timestamp">) => void;
  addTask: (task: Omit<ControlTask, "id" | "createdAt" | "updatedAt">) => void;
  updateTaskStatus: (taskId: string, status: ControlTask["status"]) => void;
  getMessagesForControl: (controlId: string) => ControlMessage[];
  getTasksForControl: (controlId: string) => ControlTask[];
  getOpenTasks: () => ControlTask[];
}

const ControlMessagesContext = createContext<ControlMessagesContextType | undefined>(undefined);

export function ControlMessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ControlMessage[]>(initialMessages);
  const [tasks, setTasks] = useState<ControlTask[]>(initialTasks);

  // Load from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch {
        // Use initial data if parse fails
      }
    }

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch {
        // Use initial data if parse fails
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addMessage = (message: Omit<ControlMessage, "id" | "timestamp">) => {
    const newMessage: ControlMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addTask = (task: Omit<ControlTask, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newTask: ControlTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTaskStatus = (taskId: string, status: ControlTask["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const getMessagesForControl = (controlId: string) => {
    return messages
      .filter((msg) => msg.controlId === controlId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const getTasksForControl = (controlId: string) => {
    return tasks.filter((task) => task.controlId === controlId);
  };

  const getOpenTasks = () => {
    return tasks.filter((task) => task.status !== "resolved");
  };

  return (
    <ControlMessagesContext.Provider
      value={{
        messages,
        tasks,
        addMessage,
        addTask,
        updateTaskStatus,
        getMessagesForControl,
        getTasksForControl,
        getOpenTasks,
      }}
    >
      {children}
    </ControlMessagesContext.Provider>
  );
}

export function useControlMessages() {
  const context = useContext(ControlMessagesContext);
  if (!context) {
    throw new Error("useControlMessages must be used within a ControlMessagesProvider");
  }
  return context;
}
