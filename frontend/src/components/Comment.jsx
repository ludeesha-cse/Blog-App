import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Alert, Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditting, setIsEditting] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [editCommentError, setEditCommentError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
        setEditCommentError(error.message)
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = async () => {
    setIsEditting(true);
    setEditedComment(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedComment }),
      });
      if (res.ok) {
        setIsEditting(false);
        onEdit(comment, editedComment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full"
          src={user.profilePicture}
          alt={user.usename}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditting ? (
          <>
            <Textarea
              className="mb-2"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                className="bg-gradient-to-r 
         from-yellow-300 via-orange-500 to-pink-600"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-gradient-to-r 
         from-yellow-300 via-orange-500 to-pink-600"
                outline
                onClick={() => setIsEditting(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center gap-2 pt-2 text-xs border-t dark:border-gray-700 max-w-fit">
              {/* Like button */}
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-xs" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes > 1 ? "likes" : "like")}
              </p>
              {/* Edit button */}
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                )}
                {/* edit comment error */}
                {editCommentError && (
                  <Alert color="failure">
                    <p>{editCommentError}</p>
                  </Alert>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
