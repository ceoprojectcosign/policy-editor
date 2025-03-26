import React from 'react'

const CommentToolbar = ({ editor, onAddComment }) => {
  if (!editor || !editor.isFocused) return null

  const { from, to } = editor.state.selection

  if (from === to) return null // no selection

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white border shadow p-2 rounded z-50">
      <button
        className="text-sm text-blue-600 font-semibold"
        onClick={() => {
          const id = `comment-${Date.now()}`
          editor.commands.setMark('comment', { id })
          onAddComment(id)
        }}
      >
        💬 Add Comment
      </button>
    </div>
  )
}

export default CommentToolbar
