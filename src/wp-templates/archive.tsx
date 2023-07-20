import { gql } from '@/__generated__';
import { Header, Footer } from '@/components';
import { GetArchiveQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';

import Link from 'next/link';
import Head from 'next/head';
import parse from 'html-react-parser';

const Template: FaustTemplate<GetArchiveQuery> = (props) => {
  const { fullHead } = props.data.page.seo;
  const { nodes: menuItems } = props.data.primaryMenuItems;
  const { archiveType } = props.data.nodeByUri;

  if (archiveType !== 'Category' && archiveType !== 'Tag') {
    return <>Archive not found</>;
  }

  const { name, posts } = props.data.nodeByUri;

  return (
    <>
      <Head>{parse(fullHead)}</Head>

      <Header menuItems={menuItems} />

      <main className="">
        <h3>Recent Posts</h3>
        <ul>
          {posts.nodes.map((post) => (
            <Link key={post.id} href={post.uri}>
              <li>{post.title}</li>
            </Link>
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
};

Template.variables = ({ uri, databaseId }, ctx) => {
  return {
    uri,
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Template.query = gql(`
  query GetArchive($uri: String!, $databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      seo {
        fullHead
      }
    }
    nodeByUri(uri: $uri) {
      archiveType: __typename
      ... on Category {
        name
        posts {
          nodes {
            id
            title
            uri
          }
        }
      }
      ... on Tag {
        name
        posts {
          nodes {
            id
            title
            uri
          }
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
