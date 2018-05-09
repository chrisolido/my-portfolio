import boto3
import io
import zipfile
import mimetypes

def lambda_handler(event, context):
    s3 = boto3.resource('s3', region_name='us-east-1')
    sns = boto3.resource('sns', region_name='us-east-1')
    topic = sns.Topic('arn:aws:sns:us-east-1:571996724366:deploySiteTopic')

    location = {
        'bucketName': 'sitebuild.kyrivanderpoel.com',
        'objectKey': 'build.zip'
    }
    try:
        job = event.get("CodePipeline.job")
        if job:
            for artifact in job['data']['inputArtifacts']:
                if artifact['name'] == "MyAppBuild":
                    location = artifact['location']['s3Location']

        print("Building portfolio from {}".format(str(location)))
        site_bucket = s3.Bucket('site.kyrivanderpoel.com')
        build_bucket = s3.Bucket(location['bucketName'])

        obj = build_bucket.Object(location['objectKey'])
        site_zip = io.BytesIO()
        obj.download_fileobj(site_zip)

        with zipfile.ZipFile(site_zip) as z:
            for name in z.namelist():
                site_bucket.upload_fileobj(z.open(name), name, ExtraArgs={
                    'ContentType': mimetypes.guess_type(name)[0]
                })
                site_bucket.Object(name).Acl().put(ACL='public-read')

        message = 'Site Successfully Deployed Manually'
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job['id'])
            message = "Site successfully deployed for CodePipeline job {}".format(job['id'])
        topic.publish(Subject='Site Deploy Success', Message=message)
    except:
        topic.publish(Subject='Site Deploy Failed', Message='The portfolio was not created successfully')
        raise
