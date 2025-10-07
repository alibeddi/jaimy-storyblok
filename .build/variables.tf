variable "app_name" {
  description = "The name of the application"
  type        = string
  default     = "jaimy-website"
}

variable "env" {
  description = "The environment for the application"
  type        = string
}

variable "env_type" {
  description = "The environment type"
  type        = string
}

variable "image_tag" {
  description = "The image tag for the application"
  type        = string
}

variable "build_account_id" {
  description = "The AWS account ID for the build account"
  type        = string
  default     = "339713158735"
}

variable "prefix" {
  description = "The prefix for the resources"
  type        = string
  default     = "fixxer-services-platform"
}

variable "host" {
  description = "The host for the application"
  type        = string
  default     = "service.jaimy.be"
}
