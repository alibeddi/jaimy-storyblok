module "eks_app" {
  source          = "git@github.com:fixxer-eu/tf-modules//container-app"
  helm_repository = "oci://${var.build_account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com"
  chart           = "fixxer-component"

  tenant                 = "jaimy"
  app_name               = var.app_name
  port                   = 3001
  env                    = var.env
  env_type               = var.env_type
  image_repository       = "${var.build_account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.prefix}/${var.app_name}"
  image_tag              = var.image_tag
  read_secrets_from_sops = false
  create_schema          = false
  enable_default_host    = true
  extra_env              = local.extra_env_var
  additional_hosts = var.env_type != "prod" ? [] : [
    {
      host = var.host
    }
  ]

}
