import boto3
import io
import zipfile
import mimetypes


def lambda_handler(event, context):
    s3 = boto3.resource('s3', region_name='us-east-1')
    sns = boto3.resource('sns', region_name='us-east-1')
    topic = sns.Topic('arn:aws:sns:us-east-1:571996724366:deploySiteTopic')

    try:
        site_bucket = s3.Bucket('site.kyrivanderpoel.com')
        build_bucket = s3.Bucket('sitebuild.kyrivanderpoel.com')

        obj = build_bucket.Object('build.zip')
        site_zip = io.BytesIO()
        obj.download_fileobj(site_zip)

        with zipfile.ZipFile(site_zip) as z:
            for name in z.namelist():
                site_bucket.upload_fileobj(z.open(name), name, ExtraArgs={
                    'ContentType': mimetypes.guess_type(name)[0]
                })
                site_bucket.Object(name).Acl().put(ACL='public-read')
        topic.publish(Subject='Site Deploy Success',
                      Message='Site Successfully Deployed')
    except:
        topic.publish(Subject='Site Deploy Failed',
                      Message='The portfolio was not created successfully')
        raise
