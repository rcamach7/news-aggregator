import { Card, CardContent, Box, Typography } from '@mui/material';
import { Textfit } from 'react-textfit';
import Image from 'next/image';

import CategoryTitle from './CategoryTitle';
import { CategoryArticles } from '@/lib/types';
import { removeNewsSource } from '@/lib/helpers';

interface Props {
  categoryArticle: CategoryArticles;
}

export default function CategoryCard({ categoryArticle }: Props) {
  const { articles } = categoryArticle;
  const primaryArticle = articles[1];

  return (
    <Box>
      <CategoryTitle title={categoryArticle.type} />

      <Card sx={{ width: 345 }}>
        <Box sx={{ position: 'relative', height: 175, width: '100%' }}>
          <Image
            src={`/api/image-proxy?url=${encodeURIComponent(
              primaryArticle.urlToImage
            )}`}
            alt={primaryArticle.title}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        </Box>
        <CardContent sx={{ px: 1, py: '8px !important' }}>
          <Textfit mode="multi" max={40} min={1} style={{ width: '100%' }}>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              {removeNewsSource(primaryArticle.title)}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {primaryArticle.sourceName}
            </Typography>
          </Textfit>
        </CardContent>
      </Card>
    </Box>
  );
}