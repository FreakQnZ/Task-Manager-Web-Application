import React, { useState, useEffect } from 'react';

interface CardProps {
  uId: string | undefined;
  id: string;
  title: string;
  desc: string;
  func: Function;
}

function Card({ uId, id, title, desc, func }: CardProps) {
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(desc);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditDesc(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send a POST request to the API
    try {
      const response = await fetch('http://localhost:3000/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: uId,
          taskId: id,
          updates: {
            taskTitle: editTitle,
            taskDesc: editDesc,
          },
        }),
      });

      if (response.ok) {
        console.log('Task updated successfully');
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }

    setEditTitle('');
    setEditDesc('');
    closeEditModal();

    func();
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeEditModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="h-64 card min-w-72 max-w-96 bg-base-100 shadow-xl m-2">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={openEditModal}>
            Edit Task
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          id='modal'
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-base-100 p-4 rounded-xl shadow-md">
            <h3 className="font-bold text-lg">Edit task</h3>
            <p className="py-4">Press ESC key to close</p>
            <div className="flex justify-center">
              <form className="flex flex-col items-center" onSubmit={handleFormSubmit}>
                <div className="flex justify-start items-center gap-4 p-2 w-full">
                  <p>Title</p>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={editTitle}
                    onChange={handleTitleChange}
                  />
                </div>

                <div className="flex justify-start items-center gap-4 p-2 w-full">
                  <p>Description</p>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="60 letters max"
                    maxLength={60}
                    value={editDesc}
                    onChange={handleDescChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn p-2 mt-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
