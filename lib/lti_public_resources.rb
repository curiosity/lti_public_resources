require 'ostruct'
require 'active_public_resources'
require 'ims/lti'
require 'lti_public_resources/lti_public_resources_config'

module LtiPublicResources
  mattr_accessor :app_root, :drivers, :ga_domain, :ga_tracking_code

  def self.setup
    yield self
  end

  def self.apps
    {
      curiosity: {
        name: "Curiosity",
        description: "Curiosity",
        tool_id: "curiosity",
        tool_type: "search",
        icon_path: "curiosity_icon.png",
        image_url: "curiosity_banner.png"
      }
    }
  end
end

require 'lti_public_resources/engine'
