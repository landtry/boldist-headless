import { gql } from '@/__generated__';
import { GetHomePageQuery } from '@/__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';

import { Button, Footer, Header, Layout, SiteHead } from '@/components';
import Link from 'next/link';

const Template: FaustTemplate<GetHomePageQuery> = (props) => {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  // Set data variables
  const { nodes: menuItems } = props.data.primaryMenuItems;
  const { fullHead } = props.data.page.seo;

  return (
    <>
      <SiteHead>{fullHead}</SiteHead>
      <Layout>
        <Header menuItems={menuItems} />

        <main className="h-[200vh] p-40">
          {/* <Button onClick={() => console.log('click')} variant="accent">
            Schedule a Consultation
          </Button> */}
        </main>

        <Footer />
      </Layout>
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
