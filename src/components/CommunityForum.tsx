"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { FORUM_POSTS, ForumPost } from "@/lib/db";
import {
  MessageSquare,
  ThumbsUp,
  CornerDownRight,
  Send,
  PlusCircle,
  Tag,
  Search,
  User,
  CheckCircle2,
  X,
} from "lucide-react";

export const CommunityForum: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // New Post Modal State
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<"pest" | "irrigation" | "organic" | "market">("pest");

  // Reply Input State per Post
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [openReplyBoxId, setOpenReplyBoxId] = useState<string | null>(null);

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      author: user?.name || "Rajesh Kumar",
      authorRole: `${user?.role?.toUpperCase() || "FARMER"} • ${user?.location || "Tamil Nadu"}`,
      avatar: user?.avatar || "👨‍🌾",
      title: newTitle,
      content: newContent,
      category: newCategory,
      date: new Date().toISOString().split("T")[0],
      upvotes: 1,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
    setShowNewPostModal(false);
  };

  const handleAddReply = (postId: string) => {
    const text = replyTextMap[postId];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: [
              ...p.replies,
              {
                id: `rep-${Date.now()}`,
                author: user?.name || "Rajesh Kumar",
                avatar: user?.avatar || "👨‍🌾",
                content: text,
                date: new Date().toISOString().split("T")[0],
              },
            ],
          };
        }
        return p;
      })
    );

    setReplyTextMap((prev) => ({ ...prev, [postId]: "" }));
    setOpenReplyBoxId(null);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
            <span>{t("forum.title")}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-theme-primary/20 text-theme-primary font-bold border border-theme-primary/30">
              Community Hub
            </span>
          </h2>
          <p className="text-xs text-theme-muted mt-1">{t("forum.subtitle")}</p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-4 py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t("forum.askQuestion")}</span>
        </button>
      </div>

      {/* Categories & Search */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", labelKey: "forum.categories.all" },
            { id: "pest", labelKey: "forum.categories.pest" },
            { id: "irrigation", labelKey: "forum.categories.irrigation" },
            { id: "organic", labelKey: "forum.categories.organic" },
            { id: "market", labelKey: "forum.categories.market" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === cat.id
                  ? "bg-theme-primary text-theme-bg"
                  : "border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text"
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-theme-muted" />
          <input
            type="text"
            placeholder={t("common.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-theme-border bg-theme-surface text-xs text-theme-text focus:outline-none focus:border-theme-primary"
          />
        </div>
      </div>

      {/* Forum Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl border border-theme-border bg-theme-card space-y-4 shadow-sm"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-theme-surface flex items-center justify-center text-xl border border-theme-border">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-theme-text">{post.author}</h4>
                  <p className="text-[11px] text-theme-muted">
                    {post.authorRole} • {post.date}
                  </p>
                </div>
              </div>

              <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase bg-theme-surface text-theme-primary border border-theme-border">
                {t(`forum.categories.${post.category}`)}
              </span>
            </div>

            {/* Post Content */}
            <div className="space-y-1.5">
              <h3 className="font-bold text-base text-theme-text leading-snug">{post.title}</h3>
              <p className="text-xs text-theme-muted leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Post Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-theme-border text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="flex items-center gap-1.5 font-bold text-theme-muted hover:text-theme-primary transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-theme-primary" />
                  <span>{post.upvotes} {t("forum.upvotes")}</span>
                </button>

                <button
                  onClick={() =>
                    setOpenReplyBoxId(openReplyBoxId === post.id ? null : post.id)
                  }
                  className="flex items-center gap-1.5 font-bold text-theme-muted hover:text-theme-text transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-theme-primary" />
                  <span>{post.replies.length} {t("forum.replies")}</span>
                </button>
              </div>

              <button
                onClick={() =>
                  setOpenReplyBoxId(openReplyBoxId === post.id ? null : post.id)
                }
                className="px-3 py-1 rounded-lg border border-theme-border bg-theme-surface text-[11px] font-bold text-theme-primary hover:border-theme-primary transition-colors"
              >
                {t("forum.reply")}
              </button>
            </div>

            {/* Replies Thread */}
            {post.replies.length > 0 && (
              <div className="pt-3 border-t border-theme-border space-y-2.5 pl-4 sm:pl-8">
                {post.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="p-3 rounded-xl border border-theme-border bg-theme-surface/60 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-theme-text flex items-center gap-1.5">
                        <span>{reply.avatar}</span>
                        <span>{reply.author}</span>
                      </span>
                      <span className="text-theme-muted">{reply.date}</span>
                    </div>
                    <p className="text-theme-muted leading-relaxed pl-5">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            {openReplyBoxId === post.id && (
              <div className="pt-3 border-t border-theme-border flex items-center gap-2">
                <input
                  type="text"
                  placeholder={t("forum.writeReply")}
                  value={replyTextMap[post.id] || ""}
                  onChange={(e) =>
                    setReplyTextMap({ ...replyTextMap, [post.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddReply(post.id);
                  }}
                  className="flex-1 rounded-xl border border-theme-border bg-theme-surface px-3 py-2 text-xs text-theme-text focus:outline-none focus:border-theme-primary"
                />
                <button
                  onClick={() => handleAddReply(post.id)}
                  className="px-3.5 py-2 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t("forum.submitReply")}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Question Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-sm font-bold text-theme-text flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-theme-primary" />
                <span>{t("forum.askQuestion")}</span>
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("forum.postTitle")}
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Recommendations for organic stem borer management in Samba rice"
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("forum.postCategory")}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                >
                  <option value="pest">{t("forum.categories.pest")}</option>
                  <option value="irrigation">{t("forum.categories.irrigation")}</option>
                  <option value="organic">{t("forum.categories.organic")}</option>
                  <option value="market">{t("forum.categories.market")}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("forum.postContent")}
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Elaborate on crop stage, observed symptoms, soil condition..."
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl border border-theme-border text-theme-muted"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold"
                >
                  {t("forum.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
