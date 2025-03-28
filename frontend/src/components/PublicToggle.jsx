import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import supabase from '../lib/supabaseClient';

const PublicToggle = ({ docId }) => {
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const fetchVisibility = async () => {
      const { data } = await supabase
        .from('documents')
        .select('is_public')
        .eq('id', docId)
        .single();

      setIsPublic(data?.is_public || false);
    };

    fetchVisibility();
  }, [docId]);

  const togglePublic = async () => {
    const { error } = await supabase
      .from('documents')
      .update({ is_public: !isPublic })
      .eq('id', docId);

    if (!error) {
      setIsPublic(!isPublic);
      toast.success(`Document is now ${!isPublic ? 'public' : 'private'}`);
    } else {
      toast.error('Failed to update access');
    }
  };

  return (
    <button
      onClick={togglePublic}
      className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
    >
      {isPublic ? '🔓 Public' : '🔒 Private'}
    </button>
  );
};

export default PublicToggle;
