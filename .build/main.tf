terraform {
  required_version = "~> 1.12.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    helm       = {}
    kubernetes = {}
  }

  backend "s3" {
    bucket  = "fixxer-build-tf-state"
    region  = "eu-central-1"
    encrypt = true
    key     = "jaimy-website.tfstate"
  }
}
