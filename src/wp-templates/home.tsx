import { gql } from '@/__generated__';
import { GetHomePageQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { Footer, Header } from '@/components';

import parse from 'html-react-parser';
import Head from 'next/head';

const Template: FaustTemplate<GetHomePageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  // Set data variables
  const { nodes: menuItems } = props.data.primaryMenuItems;
  const { fullHead } = props.data.page.seo;
  const { bookACallSection, processSection } = props.data.page.home;

  return (
    <>
      <Head>{parse(fullHead)}</Head>

      <Header menuItems={menuItems} />

      <main className="">
        <div dangerouslySetInnerHTML={{ __html: processSection?.header }}></div>
        <div dangerouslySetInnerHTML={{ __html: bookACallSection.content }}></div>
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
  query GetHomePage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      seo {
        fullHead
      }
      home {
        processSection {
          header
        }
        bookACallSection {
          content
          fieldGroupName
          header
          link {
            target
            title
            url
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
