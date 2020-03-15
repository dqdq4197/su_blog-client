import React from 'react';
import { Helmet } from 'react-helmet';


const ReactHelmet = ({ keywords, description, title, favicon,author}) => {
	return (
		<Helmet>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			{author ? <meta name="author" content={author}/> : null}
			<title>{title}</title>
			<meta property="fb:app_id" content="2340977726194427"/>
			<meta property="og:title" content={title} />
			<meta property="og:image" content={favicon} />
			<meta property="og:site_name" content="sublog" />
			<meta property="og:description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:image:width" content="800"/>
 			<meta property="og:image:height" content="400"/> 

			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={favicon} />
			<meta name="twitter:card" content="summary" />

			<meta itemprop="name" content={title} />
			<meta itemprop="description" content={description} />
			<meta itemprop="image" content={favicon} />
		</Helmet>
	);
};
export default ReactHelmet;