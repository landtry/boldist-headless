import { gql } from '@/__generated__';
import { GetPostQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { Header, Footer } from '@/components';

import parse from 'html-react-parser';
import Head from 'next/head';

const Template: FaustTemplate<GetPostQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { fullHead } = props.data.post.seo;
  const { post, primaryMenuItems } = props.data;
  const { nodes: menuItems } = primaryMenuItems;
  const { content } = post;

  return (
    <>
      <Head>{parse(fullHead)}</Head>

      <Header menuItems={menuItems} />

      <main className="">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </main>

      <Footer />
    </>
  );
};

Template.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Template.query = gql(`
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      seo {
        fullHead
      }
      author {
        node {
          name
        }
      }
    }
    generalSettings {
      title
      description
    }
    primaryMenuItems: menuItems(where: { location: PRIMARY }) {
      nodes {
        id
        uri
        path
        label
        parentId
        cssClasses
        menu {
          node {
            name
          }
        }
      }
    }
  }
`);

export default Template;
