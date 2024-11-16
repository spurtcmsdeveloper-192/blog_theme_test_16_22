import { Suspense } from "react";
import HomeComp from "./components/Home";
import { GET_POSTS_QUERY_ALL_LIST, GET_POSTS_QUERY_CATEGORY } from "./api/query";
import { fetchGraphQLCatgoData, fetchGraphQLDa } from "./api/graphicql";

export default async function  Home() {
    let varPos={
        "commonFilter": {
          "limit": 10,
          "offset": 0,
          "keyword":""
        },
        "entryFilter": {
          "Status": "Publish",
          "categorySlug": "blog",
        },
        "AdditionalData": {
        "authorDetails": false,
          "categories": true
        }
      }
      
    // { "limit": 10, "offset": 0}
    
    let posData= await fetchGraphQLDa(GET_POSTS_QUERY_ALL_LIST,varPos)

 return(
  <>
  <Suspense fallback={null} >
  <HomeComp posData={posData} />
  </Suspense>
  </>
 )
}
