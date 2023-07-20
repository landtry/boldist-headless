import { gql } from '@/__generated__';
import { GetContactPageQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { Header, Footer } from '@/components';

import Head from 'next/head';
import parse from 'html-react-parser';

const Template: FaustTemplate<GetContactPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  // Set data variables
  const { fullHead } = props.data.page.seo;
  const { nodes: menuItems } = props.data.primaryMenuItems;
  const { content } = props.data.page;

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
  query GetContactPage($databaseId: ID!, $asPreview: Boolean = false) {
  page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
    title
    content
    authorId
    seo {
      fullHead
    }
  }
  generalSettings {
    title
    description
  }
  primaryMenuItems: menuItems(where: {location: PRIMARY}) {
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
