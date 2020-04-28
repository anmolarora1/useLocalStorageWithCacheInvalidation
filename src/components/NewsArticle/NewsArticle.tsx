import React, { FC } from 'react';

type newsType = {
  title: string;
  description: string;
};

interface Props {
  article: newsType;
}

const NewsArticle: FC<Props> = ({ article: { title, description } }: Props) => (
  <article style={{ maxWidth: '500px' }}>
    <h3>{title}</h3>
    <p>{description}</p>
  </article>
);

export default NewsArticle;
