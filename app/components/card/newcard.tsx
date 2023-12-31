import React, { useState, useEffect } from 'react';

interface CardProps {
  uId: string | undefined;
  func: Function;
}

function AddCard({uId, func }: CardProps) {

  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
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
      const response = await fetch('http://localhost:3000/api/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: uId,
          taskTitle: editTitle,
          taskDesc: editDesc,
          imp: 1,
          comp: 0,
          archive: 1
        }),
      });

      if (response.ok) {
        // Handle success
        console.log('Task updated successfully');
      } else {
        // Handle error
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }

    setEditTitle('');
    setEditDesc('');
    closeEditModal();

    func()
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
    <div className="h-64 card min-w-72 max-w-96 shadow-xl m-2 border-2 border-neutral-content winter:border-red-500 border-dotted">
      <div className="card-body justify-center items-center ">
        <button className="btn btn-outline border-2 border-neutral-content border-dotted" onClick={openEditModal}>
              Add Task
        </button>
      </div>

      {isModalOpen && (
        <div
          id='modal'
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-base-100 p-4 rounded-xl shadow-md">
            <h3 className="font-bold text-lg">Add task</h3>
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

export default AddCard;
