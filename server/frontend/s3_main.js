// Load the required clients and packages
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { fromWebToken } from "@aws-sdk/credential-providers";

// Initialize the Amazon Cognito credentials provider
const REGION = "ap-southeast-2"; //e.g., 'us-east-1'
const s3 = new S3Client({
  region: REGION,
  // credentials: fromCognitoIdentityPool({
  //   client: new CognitoIdentityClient({ region: REGION }),
  //   identityPoolId: "IDENTITY_POOL_ID", // IDENTITY_POOL_ID e.g., eu-west-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx
  // }),
  credentials: fromWebToken({
    roleArn: "arn:aws:iam::508886068578:role/googleWebIdentityProvider",
    webIdentityProvider: await openIdProvider(),
    roleSessionName: "session_123",
    durationSeconds: 7200,
  }),
});

// A utility function to create HTML.
function getHtml(template) {
  s;
  return template.join("\n");
}
// Make the getHTML function available to the browser
window.getHTML = getHtml;

// List the photo albums that exist in the bucket
var albumBucketName = "arn:aws:s3:::s3testbucketforgiangnguyen";

const listAlbums = async () => {
  try {
    const data = await s3.send(
      new ListObjectsCommand({ Delimiter: "/", Bucket: albumBucketName })
    );
    var albums = data.CommonPrefixes.map(function (commonPrefix) {
      var prefix = commonPrefix.Prefix;
      var albumName = decodeURIComponent(prefix.replace("/", ""));
      return getHtml([
        "<li>",
        '<button style="margin:5px;" onclick="viewAlbum(\'' +
          albumName +
          "')\">",
        albumName,
        "</button>",
        "</li>",
      ]);
    });
    var message = albums.length
      ? getHtml(["<p>Click an album name to view it.</p>"])
      : "<p>You don't have any albums. You need to create an album.";
    var htmlTemplate = [
      "<h2>Albums</h2>",
      message,
      "<ul>",
      getHtml(albums),
      "</ul>",
    ];
    document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
  } catch (err) {
    return alert("There was an error listing your albums: " + err.message);
  }
};
// Make the viewAlbum function available to the browser
window.listAlbums = listAlbums;

// Show the photos that exist in an album
const viewAlbum = async (albumName) => {
  try {
    var albumPhotosKey = encodeURIComponent(albumName) + "/";
    const data = await s3.send(
      new ListObjectsCommand({
        Prefix: albumPhotosKey,
        Bucket: albumBucketName,
      })
    );
    var href = "https://s3." + REGION + ".amazonaws.com/";
    var bucketUrl = href + albumBucketName + "/";
    var photos = data.Contents.map(function (photo) {
      var photoKey = photo.Key;
      var photoUrl = bucketUrl + encodeURIComponent(photoKey);
      return getHtml([
        "<span>",
        "<div>",
        "<br/>",
        '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
        "</div>",
        "<div>",
        "<span>",
        photoKey.replace(albumPhotosKey, ""),
        "</span>",
        "</div>",
        "</span>",
      ]);
    });
    var message = photos.length
      ? "<p>The following photos are present.</p>"
      : "<p>There are no photos in this album.</p>";
    var htmlTemplate = [
      "<div>",
      '<button onclick="listAlbums()">',
      "Back To albums",
      "</button>",
      "</div>",
      "<h2>",
      "Album: " + albumName,
      "</h2>",
      message,
      "<div>",
      getHtml(photos),
      "</div>",
      "<h2>",
      "End of album: " + albumName,
      "</h2>",
      "<div>",
      '<button onclick="listAlbums()">',
      "Back To albums",
      "</button>",
      "</div>",
    ];
    document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
    document
      .getElementsByTagName("img")[0]
      .setAttribute("style", "display:none;");
  } catch (err) {
    return alert("There was an error viewing your album: " + err.message);
  }
};

// Make the viewAlbum function available to the browser
window.viewAlbum = viewAlbum;
