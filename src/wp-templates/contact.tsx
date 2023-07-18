import { gql } from '@/__generated__';

import Head from 'next/head';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

import { GetContactPageQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { Button } from '@/components';

// import { gql } from '@apollo/client';

const Component: FaustTemplate<GetContactPageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const { title, content, template } = props.data.page;

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header siteTitle={siteTitle} menuItems={menuItems} />

      <main className="">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </main>

      <Footer />
    </>
  );
};

Component.variables = ({ databaseId }, ctx) => {
  console.log({ databaseId });
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql(`
  query GetContactPage($databaseId: ID!, $asPreview: Boolean = false) {
  page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
    title
    content
    authorId
      template {
      ... on Template_Contact {
        contact {
          heroSection {
            title
          }
        }
      }
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

export default Component;
