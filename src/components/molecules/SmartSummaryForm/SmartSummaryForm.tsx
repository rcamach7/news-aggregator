import { Box, Modal, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

import SummaryModal from './SummaryModal';
import { useLoadingContext, useUserContext } from '@/context';
import ManualArticleEntryForm from './ManualArticleEntryForm';

interface Props {
  articleTitle: string;
  articleURL: string;
  onClose: () => void;
}

export default function SmartSummaryForm({
  articleTitle,
  articleURL,
  onClose,
}: Props) {
  const { isRateLimited, recordRequest } = useUserContext();
  const { setIsPageLoading } = useLoadingContext();

  const [manualArticleEntry, setManualArticleEntry] = useState<boolean>(false);
  const [articleContent, setArticleContent] = useState<string>('');
  const [summary, setSummary] = useState<string>('');

  function cleanArticleContent(content: string) {
    const cleanedContent = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .replace(/https?:\/\/[^\s]+/g, '');
    setArticleContent(cleanedContent);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isRateLimited) {
      return;
    }

    e.preventDefault();
    setIsPageLoading(true);
    try {
      const { data } = await axios.post('/api/smart-summary', {
        article: articleContent,
      });
      setSummary(data);
    } catch (error) {
      console.log(error);
    }

    setIsPageLoading(false);
    // recordRequest();
  };

  useEffect(() => {
    const fetchArticleSmartSummary = async () => {
      setIsPageLoading(true);
      try {
        const { data } = await axios.post('/api/smart-summary', {
          url: articleURL,
        });
        console.log('request made to API');
        setSummary(data);
      } catch (error) {
        console.log(error);
        setManualArticleEntry(true);
      }
      setIsPageLoading(false);
      recordRequest();
    };

    fetchArticleSmartSummary();
  }, []);

  return (
    <Modal open={true} onClose={onClose}>
      <Box>
        {manualArticleEntry && (
          <ManualArticleEntryForm
            handleSubmit={handleSubmit}
            articleContent={articleContent}
            cleanArticleContent={cleanArticleContent}
            articleTitle={articleTitle}
            articleURL={articleURL}
          />
        )}
        {summary && (
          <SummaryModal
            summary={summary}
            articleTitle={articleTitle}
            onClose={onClose}
          />
        )}
        {isRateLimited && (
          <Box>
            <Typography>
              You have reached your hourly limit, please try again later
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
